import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Playtime.ge",
    description: "გასართობი პლატფორმა ადმინ პანელით",
    category: "ვებ აპლიკაცია",
    url: "https://playtime.ge",
    features: ["ადმინ პანელი", "მომხმარებლის ავტორიზაცია", "დინამიური კონტენტი"],
    image: "/projects/playtime.webp",
  },
  {
    title: "WasteAway",
    description: "ნაგვის გატანის სერვისი თბილისის კორპუსებისთვის",
    category: "სერვისის ვებსაიტი",
    url: "https://wasteaway.ge",
    features: ["განაცხადის ფორმა", "რუკაზე მონიშვნა", "ქართული და ინგლისური"],
    image: "/projects/wasteaway.webp",
  },
  {
    title: "DevNews",
    description: "ტექნოლოგიური სიახლეების პლატფორმა",
    category: "ბლოგ პლატფორმა",
    url: "https://dev-news-blond.vercel.app",
    features: ["სტატიების მართვა", "კატეგორიები", "SEO ოპტიმიზაცია"],
    image: "/projects/devnews.webp",
  },
  {
    title: "UniHub",
    description: "საგანმანათლებლო პლატფორმა",
    category: "ედუკაცია",
    url: "https://unihub-edu.vercel.app",
    features: ["კურსების მართვა", "სტუდენტის პორტალი", "მასალების ატვირთვა"],
    image: "/projects/unihub.webp",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
            პორტფოლიო
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            ბოლო პროექტები
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            რეალური პროექტები, რომლებიც უკვე მუშაობს და კლიენტებს ემსახურება
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300"
            >
              {/* Project Preview */}
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* External link icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-foreground text-background p-2 rounded-full">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-accent font-medium">{project.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-secondary px-2 py-1 rounded-md text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
