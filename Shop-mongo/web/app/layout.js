import './globals.css';

export const metadata = {
  title: 'Shop Mongo',
  description: 'Danh sách sản phẩm từ Express API và MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

