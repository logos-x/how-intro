import VerifyErrorContent from "@/features/auth/components/VerifyErrorContent";

export default async function VerifyErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string }>;
}) {
  const { reason } = await searchParams;
  return (
    <VerifyErrorContent
      reason={reason === "invalid_link" ? "invalid_link" : "expired"}
    />
  );
}
