// ===============================
// Settings
// ===============================

// ここにGoogleフォームのURLを入れてください。
// 例: const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/xxxx/viewform";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScIoMHG4QjlH-FNP4nwSwZ4it9GhtRs_vEeAjqReaXFnTk3RQ/viewform";
const AREA_ENTRY_ID = "entry.1015631497"; // 配布エリアのentry IDに差し替え

// ===============================
// Area Parameter
// ===============================

// LPのURL末尾 ?area=A / ?area=B / ?area=C を読み取る
const params = new URLSearchParams(window.location.search);
const area = params.get("area");

// ===============================
// Form Link Setup
// ===============================

function buildFormUrl() {
  // area がない場合は、普通のGoogleフォームURLへ
  if (!area) return GOOGLE_FORM_URL;

  // Googleフォームの事前入力URLを作る
  const separator = GOOGLE_FORM_URL.includes("?") ? "&" : "?";

  return `${GOOGLE_FORM_URL}${separator}usp=pp_url&${AREA_ENTRY_ID}=${encodeURIComponent(area)}`;
}

// LP内のフォームボタンにURLを設定
document.querySelectorAll(".js-form-link").forEach((link) => {
  link.href = buildFormUrl();
});

// ===============================
// Simple Click Logging
// ===============================

document.querySelectorAll(".js-form-link").forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Form link clicked", {
      area: area || "none",
      path: window.location.pathname,
      timestamp: new Date().toISOString()
    });
  });
});
