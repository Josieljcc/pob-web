import { Route, Routes, Link, Outlet } from 'react-router-dom';

import { application } from '@pob-web/application';

import { PassiveTreePage } from '@/features/passive-tree/passive-tree-page';

import { Button } from '@/components/ui/button';

function Shell() {
  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          PoB TypeScript Web
        </h1>
        <p className="mt-2 text-muted-foreground">
          Phase 2 — passive tree demo + Phase 1 build XML.{' '}
          <span className="font-mono text-xs">{application()}</span>
        </p>
        <Button className="mt-4" type="button">
          Smoke UI
        </Button>
      </header>

      <div role="navigation" className="mb-6">
        <ul className="flex flex-wrap gap-4">
          <li>
            <Link className="text-primary underline" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="text-primary underline" to="/page-2">
              Page 2
            </Link>
          </li>
          <li>
            <Link className="text-primary underline" to="/passive-tree">
              Passive tree
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/passive-tree" element={<PassiveTreePage />} />
      <Route path="/" element={<Shell />}>
        <Route
          index
          element={
            <div>
              Root route. <Link to="/page-2">Page 2</Link> ·{' '}
              <Link to="/passive-tree">Passive tree demo</Link>
            </div>
          }
        />
        <Route
          path="page-2"
          element={
            <div>
              <Link to="/">Back home</Link>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
