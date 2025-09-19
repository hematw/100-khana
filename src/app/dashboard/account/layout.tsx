import { AccountSidebar } from "@/src/components/account/account-sidebar";

function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-6 p-6 justify-center items-start">
      <AccountSidebar />
      <div className="w-[768px] ">{children}</div>
    </div>
  );
}

export default AccountLayout;
