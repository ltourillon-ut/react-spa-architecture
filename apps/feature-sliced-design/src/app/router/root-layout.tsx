import { Outlet } from 'react-router-dom'

import { AppHeader } from '@/widgets/app-header'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <AppHeader />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
