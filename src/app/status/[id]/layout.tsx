export default function StatusLayout({
  children,
  statistics,
}: {
  children: React.ReactNode;
  statistics: React.ReactNode;
}) {
  return (
    <>
      {children}
      {statistics}
    </>
  );
}
