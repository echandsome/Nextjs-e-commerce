type TProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthFormCard({ title, subtitle, children }: TProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-bitex-blue-900/30 via-gray-100 to-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
        <div className="mt-8 flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}
