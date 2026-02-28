#!/usr/bin/env bash
set -euo pipefail

################################
# 配置区（可用环境变量覆盖）
################################
REMOTE_HOST="${REMOTE_HOST:-tcloud}"
REMOTE_TMP_DIR="${REMOTE_TMP_DIR:-/tmp}"

BRANCH="${BRANCH:-main}"
BASE_REF="${BASE_REF:-origin/${BRANCH}}"

REPO_TOP="$(git rev-parse --show-toplevel)"
REPO_NAME="${REPO_NAME:-$(basename "$REPO_TOP")}"

BUNDLE_NAME="${BUNDLE_NAME:-${REPO_NAME}.delta.bundle}"
STATE_FILE="${STATE_FILE:-last_sent_id}"

# 原子上传：先传 partial，再 mv 成正式 bundle
PARTIAL_NAME=".${BUNDLE_NAME}.partial.$$"

################################
# 工具函数
################################
log()  { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"; }
fail() { echo "❌ ERROR: $*" >&2; exit 1; }

################################
# Step 0: 前置校验
################################
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail "当前目录不是 git 仓库"
git show-ref --verify --quiet "refs/heads/${BRANCH}" || fail "本地不存在分支 ${BRANCH}"

################################
# Step 1: SSH 预热（无人值守关键）
################################
log "🔐 SSH 预热 ${REMOTE_HOST}"
ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -o ConnectTimeout=10 \
  "${REMOTE_HOST}" "true" || fail "SSH 连接失败：${REMOTE_HOST}"
log "✅ SSH 预热完成"

################################
# Step 2: 获取基线（origin）
################################
log "🔄 git fetch origin --prune"
git fetch origin --prune || fail "git fetch origin 失败"

BASE_COMMIT="$(git rev-parse "${BASE_REF}" 2>/dev/null || true)"
[[ -n "${BASE_COMMIT}" ]] || fail "无法获取 ${BASE_REF}，请确认远端存在"

LOCAL_HEAD="$(git rev-parse "${BRANCH}")"
log "📍 BASE=${BASE_REF} ${BASE_COMMIT}"
log "📍 LOCAL=${BRANCH} ${LOCAL_HEAD}"

################################
# Step 3: 计算增量/降级 full bundle
################################
RANGE_ARGS=()
if git merge-base --is-ancestor "${BASE_COMMIT}" "${BRANCH}"; then
  NEW_CNT="$(git rev-list --count "${BASE_COMMIT}..${BRANCH}")"
  if [[ "${NEW_CNT}" -eq 0 ]]; then
    log "ℹ️ 没有新提交（${BASE_REF}..${BRANCH} 为空），无需同步"
    exit 0
  fi
  log "📦 新提交数=${NEW_CNT}，创建 delta bundle"
  RANGE_ARGS=("${BRANCH}" "^${BASE_COMMIT}")
else
  # 发生分叉/force 等情况：避免 bundle create 失败，降级为 full bundle
  log "⚠️ 基线不是 ${BRANCH} 的祖先（可能分叉/force），降级为 FULL bundle"
  RANGE_ARGS=("${BRANCH}")
fi

################################
# Step 4: 创建 bundle
################################
log "📦 创建 bundle：${BUNDLE_NAME}"
rm -f "${BUNDLE_NAME}"
git bundle create "${BUNDLE_NAME}" "${RANGE_ARGS[@]}" || fail "git bundle 创建失败"
[[ -s "${BUNDLE_NAME}" ]] || fail "bundle 文件为空（异常情况）"
log "✅ bundle 创建成功：$(du -h "${BUNDLE_NAME}" | awk '{print $1}')"

################################
# Step 5: 原子上传（scp -> mv）
################################
log "🚀 上传 bundle 到 ${REMOTE_HOST}:${REMOTE_TMP_DIR}（原子落盘）"
scp -O \
  -o BatchMode=yes \
  -o ServerAliveInterval=30 \
  -o ServerAliveCountMax=3 \
  "${BUNDLE_NAME}" "${REMOTE_HOST}:${REMOTE_TMP_DIR}/${PARTIAL_NAME}" \
  || fail "scp 上传失败"

ssh -o BatchMode=yes "${REMOTE_HOST}" \
  "mv -f '${REMOTE_TMP_DIR}/${PARTIAL_NAME}' '${REMOTE_TMP_DIR}/${BUNDLE_NAME}'" \
  || fail "远端 mv 原子落盘失败"

log "✅ 上传完成：${REMOTE_HOST}:${REMOTE_TMP_DIR}/${BUNDLE_NAME}"

################################
# Step 6: 记录本次发送的本地 HEAD（便于追踪）
################################
echo "${LOCAL_HEAD}" > "${STATE_FILE}"
log "🎉 完成：${STATE_FILE}=${LOCAL_HEAD}"