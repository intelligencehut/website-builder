export function getAccessDeniedHTML(
  userName: string,
  siteName: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="background:#1a1a2e;padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#e8a951;font-size:22px;font-weight:700;">Website Builder</h1>
      <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">Access Request Update</p>
    </div>
    <div style="padding:32px;">
      <p style="color:#374151;font-size:15px;line-height:1.6;margin-bottom:16px;">
        Hi <strong>${userName}</strong>,
      </p>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin-bottom:20px;">
        Your request to access <strong>${siteName}</strong> was not approved at this time.
      </p>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;">
        If you believe this is an error, please contact the site administrator directly.
      </p>
    </div>
    <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:11px;">&copy; ${new Date().getFullYear()} Website Builder. Automated notification.</p>
    </div>
  </div>
</body>
</html>`;
}
