export function getAccessRequestAdminHTML(
  userName: string,
  userEmail: string,
  siteName: string,
  reviewUrl: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f3f4f6;">
  <div style="max-width:520px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="background:#1a1a2e;padding:28px 32px;text-align:center;">
      <h1 style="margin:0;color:#e8a951;font-size:22px;font-weight:700;">Website Builder</h1>
      <p style="margin:6px 0 0;color:#9ca3af;font-size:13px;">New Access Request</p>
    </div>
    <div style="padding:32px;">
      <p style="color:#374151;font-size:15px;line-height:1.6;margin-bottom:20px;">
        <strong>${userName}</strong> (${userEmail}) has requested access to:
      </p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-bottom:24px;text-align:center;">
        <p style="margin:0;color:#111827;font-size:18px;font-weight:600;">${siteName}</p>
      </div>
      <p style="color:#6b7280;font-size:14px;line-height:1.6;margin-bottom:24px;">
        Please review this request and approve or deny access from the admin dashboard.
      </p>
      <div style="text-align:center;">
        <a href="${reviewUrl}" style="display:inline-block;padding:12px 28px;background:#e8a951;color:#1a1a2e;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">
          Review Request
        </a>
      </div>
    </div>
    <div style="background:#f9fafb;padding:20px;text-align:center;border-top:1px solid #e5e7eb;">
      <p style="margin:0;color:#9ca3af;font-size:11px;">&copy; ${new Date().getFullYear()} Website Builder. Automated notification.</p>
    </div>
  </div>
</body>
</html>`;
}
