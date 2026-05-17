// ===============================
// Settings
// ===============================

// ここにGoogleフォームのURLを入れてください。
// 例: const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/xxxx/viewform";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScIoMHG4QjlH-FNP4nwSwZ4it9GhtRs_vEeAjqReaXFnTk3RQ/viewform?usp=publish-editor";

// QRコードやエリア別に計測したい場合は、URLに ?area=A のように付けてください。
// 例: https://example.github.io/story-letter-lp/?area=A
const params = new URLSearchParams(window.location.search);
const area = params.get("area");

// ===============================
// Form Link Setup
// ===============================

function buildFormUrl() {
  if (!area) return GOOGLE_FORM_URL;

  // Googleフォーム側に「配布エリア」などの質問を作り、事前入力URLを使う場合は、
  // ここを entry.xxxxx= の形式に変更すると、エリア情報を自動入力できます。
  // まずは簡易計測として、URL末尾に area パラメータを付けています。
  const separator = GOOGLE_FORM_URL.includes("?") ? "&" : "?";
  return `${GOOGLE_FORM_URL}${separator}area=${encodeURIComponent(area)}`;
}

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
