import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <span className="sr-only">Brilliant Esystems Logo</span>
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary-foreground">
                  BE
                </div>
              </div>
              <span className="font-bold">Brilliant Esystems</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Innovative technology solutions for modern businesses. Transforming ideas into digital reality.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-muted-foreground hover:text-foreground">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-muted-foreground hover:text-foreground">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Services</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/services/web-development" className="text-sm text-muted-foreground hover:text-foreground">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-apps" className="text-sm text-muted-foreground hover:text-foreground">
                  Mobile Applications
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-solutions" className="text-sm text-muted-foreground hover:text-foreground">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/digital-marketing"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/it-consulting" className="text-sm text-muted-foreground hover:text-foreground">
                  IT Consulting
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Contact</h3>
            <address className="mt-4 not-italic">
              <p className="text-sm text-muted-foreground">
                123 Tech Avenue
                <br />
                Innovation District
                <br />
                Cityville, CV 12345
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <a href="mailto:info@brilliantesystems.com" className="hover:text-foreground">
                  info@brilliantesystems.com
                </a>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                <a href="tel:+11234567890" className="hover:text-foreground">
                  +1 (123) 456-7890
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Brilliant Esystems Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

