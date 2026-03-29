import { Route, Routes, Link } from 'react-router-dom';

import { application } from '@pob-web/application';

import { Button } from '@/components/ui/button';

export function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          PoB TypeScript Web
        </h1>
        <p className="mt-2 text-muted-foreground">
          Phase 0 — Nx monorepo, React 19, Rspack, TanStack Query, shadcn/ui.{' '}
          <span className="font-mono text-xs">{application()}</span>
        </p>
        <Button className="mt-4" type="button">
          Smoke UI
        </Button>
      </header>

      <div role="navigation" className="mb-6">
        <ul className="flex gap-4">
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
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              Root route. <Link to="/page-2">Page 2</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Back home</Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
