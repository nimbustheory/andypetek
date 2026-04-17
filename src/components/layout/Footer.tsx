import { Link } from 'react-router-dom'

const footerLinks = {
  content: [
    { to: '/writing', label: 'Writing' },
    { to: '/guides', label: 'Guides' },
    { to: '/rough-cut', label: 'Rough Cut' },
    { to: '/watching', label: 'Watching' },
    { to: '/reading', label: 'Reading' },
    { to: '/books', label: 'Books' },
    { to: '/about', label: 'About' },
    { to: '/media', label: 'Media' },
  ],
  social: [
    { href: 'https://instagram.com/andy.the.daydreamer', label: 'Instagram' },
    { href: 'https://linkedin.com/in/andypetek', label: 'LinkedIn' },
  ],
  projects: [
    { href: 'https://nimbuslabs.dev', label: 'Nimbus Labs' },
    { href: 'https://instagram.com/daydreamerbeverage', label: 'Daydreamer Beverage' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-subtle">
      <div className="max-w-wide mx-auto px-content py-section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl text-text">Andy Petek</span>
            </Link>
            <p className="mt-4 text-text-muted font-body text-body-sm max-w-md">
              Creative entrepreneur building software for communities he cares about. 
              Traveling America, designing beer cans, writing books, watching too many movies.
            </p>
            <p className="mt-6 text-text-subtle font-mono text-caption">
              Made by one guy on the road somewhere who should probably be sleeping.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-body font-semibold text-caption uppercase tracking-wider text-text-muted mb-4">
              Explore
            </h4>
            <ul className="space-y-2">
              {footerLinks.content.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-text-muted hover:text-text transition-colors font-body text-body-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="font-body font-semibold text-caption uppercase tracking-wider text-text-muted mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text transition-colors font-body text-body-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-body font-semibold text-caption uppercase tracking-wider text-text-muted mb-4 mt-8">
              Projects
            </h4>
            <ul className="space-y-2">
              {footerLinks.projects.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-text transition-colors font-body text-body-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-surface-subtle">
          <p className="text-text-subtle font-mono text-caption text-center sm:text-left">
            © {currentYear} Andy Petek. Daydreaming since forever.
          </p>
        </div>
      </div>
    </footer>
  )
}
