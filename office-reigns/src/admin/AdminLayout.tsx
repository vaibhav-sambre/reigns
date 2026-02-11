// Admin Layout with navigation

import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';

export function AdminLayout() {
    return (
        <div className="admin-layout">
            <header className="admin-header">
                <h1 className="admin-header__title">
                    <NavLink to="/" className="admin-header__home-link">
                        🏢 Office Reigns
                    </NavLink>
                    <span className="admin-header__separator">/</span>
                    <span>Admin</span>
                </h1>
                {/* TODO: Add authentication in future version */}
            </header>

            <nav className="admin-nav">
                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`
                    }
                >
                    📋 Cards
                </NavLink>
                <NavLink
                    to="/admin/settings"
                    className={({ isActive }) =>
                        `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`
                    }
                >
                    ⚙️ Settings
                </NavLink>
                <NavLink
                    to="/admin/import-export"
                    className={({ isActive }) =>
                        `admin-nav__link ${isActive ? 'admin-nav__link--active' : ''}`
                    }
                >
                    📦 Import/Export
                </NavLink>
            </nav>

            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
}
