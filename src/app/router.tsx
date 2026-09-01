import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import { P1Gallery } from "@/app/dev/P1Gallery"
import { PrimitiveGallery } from "@/app/dev/PrimitiveGallery"
import { ShellCanvas } from "@/app/dev/ShellCanvas"
import { TokenGallery } from "@/app/dev/TokenGallery"
import { ApplicationDeclinedPage } from "@/features/auth/ApplicationDeclinedPage"
import { ApplicationReviewPage } from "@/features/auth/ApplicationReviewPage"
import { SignInPage } from "@/features/auth/SignInPage"
import { WelcomePage } from "@/features/auth/WelcomePage"
import { AppHomePage } from "@/features/home/AppHomePage"
import { EventEditorPage } from "@/features/organizer/EventEditorPage"
import { EventLiveDoorPage } from "@/features/organizer/EventLiveDoorPage"
import { EventNotifyPage } from "@/features/organizer/EventNotifyPage"
import { EventOrdersPage } from "@/features/organizer/EventOrdersPage"
import { EventRefundsPage } from "@/features/organizer/EventRefundsPage"
import { EventTicketsPage } from "@/features/organizer/EventTicketsPage"
import { OrganizerArchivePage } from "@/features/organizer/OrganizerArchivePage"
import { OrganizerAttendancePage } from "@/features/organizer/OrganizerAttendancePage"
import { OrganizerLiveDoorPage } from "@/features/organizer/OrganizerLiveDoorPage"
import { OrganizerScanHistoryPage } from "@/features/organizer/OrganizerScanHistoryPage"
import { OrganizerScannersPage } from "@/features/organizer/OrganizerScannersPage"
import { SeatingBuilderPage } from "@/features/organizer/SeatingBuilderPage"
import { OrganizerEventsRoute } from "@/features/organizer/OrganizerEventsRoute"
import { OrganizerGate } from "@/features/organizer/OrganizerGate"
import { MarketplaceProfilePage } from "@/features/organizer/MarketplaceProfilePage"
import { AvailabilityRoute } from "@/features/home/AvailabilityRoute"
import { FinanceRoute } from "@/features/home/FinanceRoute"
import { GalleryRoute } from "@/features/home/GalleryRoute"
import { HireRequestsRoute } from "@/features/home/HireRequestsRoute"
import { PortfolioRoute } from "@/features/home/PortfolioRoute"
import { ProfileRoute } from "@/features/home/ProfileRoute"
import { OrganizerMarketplacePage } from "@/features/organizer/OrganizerMarketplacePage"
import { OrganizerSalesPage } from "@/features/organizer/OrganizerSalesPage"
import { OrganizerVenuesPage } from "@/features/organizer/OrganizerVenuesPage"
import { NotificationsPage } from "@/features/account/NotificationsPage"
import { SettingsPage } from "@/features/account/SettingsPage"
import { SupportCasePage, SupportPage } from "@/features/account/SupportPage"
import { OrganizerReviewsPage } from "@/features/organizer/OrganizerReviewsPage"
import { AppShell } from "@/layouts/AppShell"
import { AuthLayout } from "@/layouts/AuthLayout"
import { EntryShell } from "@/layouts/EntryShell"
import { MockSession } from "@/layouts/MockSession"
import { ScannerShell } from "@/layouts/ScannerShell"
import { ScannerEventsPage } from "@/features/scanner/ScannerEventsPage"
import { ScannerScanPage } from "@/features/scanner/ScannerScanPage"
import { ScannerSignInPage } from "@/features/scanner/ScannerSignInPage"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/dev/tokens" element={<TokenGallery />} />
        <Route path="/dev/primitives" element={<PrimitiveGallery />} />
        <Route path="/dev/p1" element={<P1Gallery />} />
        <Route path="/dev/shell" element={<Navigate to="/app" replace />} />

        <Route
          element={
            <MockSession>
              <AppShell />
            </MockSession>
          }
        >
          <Route path="/app" element={<AppHomePage />} />
          <Route path="/app/events" element={<OrganizerEventsRoute />} />
          <Route
            path="/app/events/:eventId/edit"
            element={
              <OrganizerGate>
                <EventEditorPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/orders"
            element={
              <OrganizerGate>
                <EventOrdersPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/tickets"
            element={
              <OrganizerGate>
                <EventTicketsPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/refunds"
            element={
              <OrganizerGate>
                <EventRefundsPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/notify"
            element={
              <OrganizerGate>
                <EventNotifyPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/live-door"
            element={
              <OrganizerGate>
                <EventLiveDoorPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/scanners"
            element={
              <OrganizerGate>
                <OrganizerScannersPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/live-door"
            element={
              <OrganizerGate>
                <OrganizerLiveDoorPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/scan-history"
            element={
              <OrganizerGate>
                <OrganizerScanHistoryPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/attendance"
            element={
              <OrganizerGate>
                <OrganizerAttendancePage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/events/:eventId/seating"
            element={
              <OrganizerGate>
                <SeatingBuilderPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/venues"
            element={
              <OrganizerGate>
                <OrganizerVenuesPage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/archive"
            element={
              <OrganizerGate>
                <OrganizerArchivePage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/sales"
            element={
              <OrganizerGate>
                <OrganizerSalesPage />
              </OrganizerGate>
            }
          />
          <Route path="/app/finance" element={<FinanceRoute />} />
          <Route
            path="/app/marketplace"
            element={
              <OrganizerGate>
                <OrganizerMarketplacePage />
              </OrganizerGate>
            }
          />
          <Route
            path="/app/marketplace/:profileId"
            element={
              <OrganizerGate>
                <MarketplaceProfilePage />
              </OrganizerGate>
            }
          />
          <Route path="/app/hire-requests" element={<HireRequestsRoute />} />
          <Route path="/app/availability" element={<AvailabilityRoute />} />
          <Route path="/app/reviews" element={<OrganizerReviewsPage />} />
          <Route path="/app/profile" element={<ProfileRoute />} />
          <Route path="/app/portfolio" element={<PortfolioRoute />} />
          <Route path="/app/gallery" element={<GalleryRoute />} />
          <Route path="/app/notifications" element={<NotificationsPage />} />
          <Route path="/app/settings" element={<SettingsPage />} />
          <Route path="/app/support" element={<SupportPage />} />
          <Route path="/app/support/:caseId" element={<SupportCasePage />} />
          <Route path="/app/*" element={<ShellCanvas />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<SignInPage />} />
        </Route>

        <Route element={<EntryShell />}>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route
            path="/application/review"
            element={<ApplicationReviewPage />}
          />
          <Route
            path="/application/declined"
            element={<ApplicationDeclinedPage />}
          />
        </Route>

        <Route element={<ScannerShell />}>
          <Route path="/scanner" element={<ScannerSignInPage />} />
          <Route path="/scanner/events" element={<ScannerEventsPage />} />
          <Route path="/scanner/scan" element={<ScannerScanPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
