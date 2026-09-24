# LingoLearn – Homepage (từ Figma)

Code được convert từ Figma design (node `1:2`) sang Next.js (App Router) + TypeScript + Tailwind CSS, khớp với stack bạn đang dùng (NestJS + Next.js + shadcn/ui).

## Cài đặt

```bash
npm install lucide-react
```

Font `Plus Jakarta Sans` (dùng trong design) — thêm vào `app/layout.tsx`:

```tsx
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={plusJakarta.className}>
      <body>{children}</body>
    </html>
  );
}
```

## Cấu trúc file

```
app/
  page.tsx                          → ghép các section thành trang chủ
components/
  layout/
    Header.tsx                      → Navbar
    Footer.tsx
  sections/
    HeroSection.tsx                 → Hero + chat mockup
    SocialProof.tsx                 → 4 stat card + logo đối tác
    CoreFeatures.tsx                → 4 feature card
    VoiceTutorSection.tsx           → AI Voice Tutor interactive
  ui/
    Badge.tsx
    StatCard.tsx
    FeatureCard.tsx
```

## ⚠️ Lưu ý quan trọng về icon

Môi trường mình đang chạy không tải trực tiếp được asset SVG gốc từ Figma (bị chặn bởi network policy), nên tất cả icon trong code này được thay bằng icon tương đồng từ thư viện **`lucide-react`** (mic, message-circle, route, gamepad, award, sparkles...) thay vì export chính xác từng SVG trong design.

→ Về mặt bố cục, màu sắc, spacing, typography: đã bám sát 1:1 theo design (lấy trực tiếp từ Figma dev-mode).
→ Về icon: bạn nên mở lại Figma, export icon gốc (hoặc dùng Figma MCP ngay trong VS Code/Claude Code nếu máy đó có mạng ra ngoài không bị chặn) rồi thay `lucide-react` bằng SVG thật nếu cần khớp pixel-perfect.

## Còn thiếu (chưa có trong scope trang chủ này)

- Header chưa có mobile menu (hamburger)
- Hero chat mockup hiện là tĩnh — bạn có thể animate bằng Framer Motion sau
- Chưa nối dữ liệu thật (stat numbers, feature list) — hiện đang hardcode theo nội dung Figma
