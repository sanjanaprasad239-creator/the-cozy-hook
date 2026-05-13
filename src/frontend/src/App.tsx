import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

// Lazy-loaded pages
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const CollectionPage = lazy(() =>
  import("./pages/CollectionPage").then((m) => ({
    default: m.CollectionPage,
  })),
);
const ProductPage = lazy(() =>
  import("./pages/ProductPage").then((m) => ({ default: m.ProductPage })),
);
const OurStoryPage = lazy(() =>
  import("./pages/OurStoryPage").then((m) => ({ default: m.OurStoryPage })),
);
const JournalPage = lazy(() =>
  import("./pages/JournalPage").then((m) => ({ default: m.JournalPage })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const AdminPage = lazy(() =>
  import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })),
);
const CartPage = lazy(() =>
  import("./pages/CartPage").then((m) => ({ default: m.CartPage })),
);
const ConfirmationPage = lazy(() =>
  import("./pages/ConfirmationPage").then((m) => ({
    default: m.ConfirmationPage,
  })),
);

const WishlistPage = lazy(() =>
  import("./pages/WishlistPage").then((m) => ({ default: m.WishlistPage })),
);
const FAQPage = lazy(() =>
  import("./pages/FAQPage").then((m) => ({ default: m.FAQPage })),
);
const CareGuidePage = lazy(() =>
  import("./pages/CareGuidePage").then((m) => ({ default: m.CareGuidePage })),
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function RouterOutlet() {
  return <Outlet />;
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <RouterOutlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const collectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collection",
  component: () => <CollectionPage />,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: () => <ProductPage />,
});

const ourStoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/our-story",
  component: () => <OurStoryPage />,
});

const journalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/journal",
  component: () => <JournalPage />,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => <ContactPage />,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <AdminPage />,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => <CartPage />,
});

const confirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmed",
  validateSearch: (search: Record<string, unknown>) => ({
    name: typeof search.name === "string" ? search.name : "",
    total: typeof search.total === "number" ? search.total : 0,
    itemCount: typeof search.itemCount === "number" ? search.itemCount : 0,
  }),
  component: () => <ConfirmationPage />,
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishlist",
  component: () => <WishlistPage />,
});

const faqRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/faq",
  component: () => <FAQPage />,
});

const careGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/care-guide",
  component: () => <CareGuidePage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  collectionRoute,
  productRoute,
  ourStoryRoute,
  journalRoute,
  contactRoute,
  adminRoute,
  cartRoute,
  confirmationRoute,
  wishlistRoute,
  faqRoute,
  careGuideRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
