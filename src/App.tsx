import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import RequireOrganizer from '@/components/RequireOrganizer'
import OrganizerLayout from '@/layouts/OrganizerLayout'
import CashiersListPage from '@/pages/cashiers/CashiersListPage'
import DashboardPage from '@/pages/DashboardPage'
import EventDetailPage from '@/pages/events/EventDetailPage'
import EventsListPage from '@/pages/events/EventsListPage'
import LoginPage from '@/pages/LoginPage'
import PayoutPage from '@/pages/payout/PayoutPage'
import StatsPage from '@/pages/stats/StatsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <RequireOrganizer>
              <OrganizerLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/events" element={<EventsListPage />} />
                  <Route path="/events/:id" element={<EventDetailPage />} />
                  <Route path="/cashiers" element={<CashiersListPage />} />
                  <Route path="/payout" element={<PayoutPage />} />
                  <Route path="/reports" element={<StatsPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </OrganizerLayout>
            </RequireOrganizer>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
