import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PortfolioPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-muted/50 py-20 md:py-28">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Our Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Explore our recent projects and see how we've helped businesses achieve their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <PortfolioItem
              title="E-Commerce Platform"
              category="Web Development"
              image="https://picsum.photos/seed/ecommerce/600/400"
              href="/portfolio/e-commerce-platform"
            />
            <PortfolioItem
              title="Health & Fitness App"
              category="Mobile Application"
              image="https://picsum.photos/seed/fitness/600/400"
              href="/portfolio/health-fitness-app"
            />
            <PortfolioItem
              title="Enterprise CRM System"
              category="Custom Software"
              image="https://picsum.photos/seed/crm/600/400"
              href="/portfolio/enterprise-crm"
            />
            <PortfolioItem
              title="Cloud Migration"
              category="Cloud Solutions"
              image="https://picsum.photos/seed/cloud/600/400"
              href="/portfolio/cloud-migration"
            />
            <PortfolioItem
              title="Digital Marketing Campaign"
              category="Digital Marketing"
              image="https://picsum.photos/seed/marketing/600/400"
              href="/portfolio/marketing-campaign"
            />
            <PortfolioItem
              title="IT Strategy Consulting"
              category="IT Consulting"
              image="https://picsum.photos/seed/consulting/600/400"
              href="/portfolio/it-strategy"
            />
            <PortfolioItem
              title="Financial Dashboard"
              category="Data Analytics"
              image="https://picsum.photos/seed/finance/600/400"
              href="/portfolio/financial-dashboard"
            />
            <PortfolioItem
              title="Restaurant Ordering System"
              category="Web & Mobile Development"
              image="https://picsum.photos/seed/restaurant/600/400"
              href="/portfolio/restaurant-ordering"
            />
            <PortfolioItem
              title="Real Estate Platform"
              category="Web Development"
              image="https://picsum.photos/seed/realestate/600/400"
              href="/portfolio/real-estate-platform"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <div className="rounded-xl bg-primary p-8 md:p-12 lg:p-16 text-primary-foreground">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl mb-8">Let's discuss how we can help bring your vision to life.</p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function PortfolioItem({
  title,
  category,
  image,
  href,
}: {
  title: string
  category: string
  image: string
  href: string
}) {
  return (
    <Link href={href} className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="text-sm font-medium text-muted-foreground">{category}</div>
        <h3 className="mt-2 text-xl font-semibold group-hover:text-primary">{title}</h3>
      </div>
    </Link>
  )
}

