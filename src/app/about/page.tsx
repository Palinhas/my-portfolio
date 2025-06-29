import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  Code,
  Coffee,
  Music,
  Camera,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Mim</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Desenvolvedor apaixonado por tecnologia, sempre em busca de
              soluções elegantes para problemas complexos. Aqui está a minha
              história.
            </p>
          </div>

          {/* Imagem e Bio Principal */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="w-64 h-64 mx-auto md:mx-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                CB
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Carlos Bicho</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Comecei a programar há mais de 8 anos e desde então tenho-me
                dedicado a criar experiências web que fazem a diferença.
                Especializo-me em tecnologias modernas como React, Next.js e
                TypeScript, sempre com foco na performance e experiência do
                utilizador.
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Portugal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>8+ anos de experiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  <span>Full-Stack Developer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Experiência Profissional
          </h2>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Senior Full-Stack Developer</CardTitle>
                    <CardDescription>
                      Tech Company • 2022 - Presente
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Atual</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Lidero o desenvolvimento de aplicações web complexas,
                  mentorizo developers juniores e implemento arquiteturas
                  escaláveis.
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Node.js",
                    "PostgreSQL",
                  ].map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frontend Developer</CardTitle>
                <CardDescription>Startup • 2020 - 2022</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Desenvolvi interfaces modernas e responsivas, implementei
                  design systems e otimizei performance de aplicações.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Vue.js", "Tailwind CSS", "JavaScript"].map(
                    (tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Junior Developer</CardTitle>
                <CardDescription>Agência Digital • 2018 - 2020</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Primeiros passos na carreira, desenvolvendo websites e
                  aprendendo as bases do desenvolvimento web moderno.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["HTML", "CSS", "JavaScript", "PHP", "WordPress"].map(
                    (tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Detalhadas */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Competências Técnicas
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
                <CardDescription>
                  Tecnologias para interfaces modernas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "React", level: "Avançado" },
                    { name: "Next.js", level: "Avançado" },
                    { name: "TypeScript", level: "Avançado" },
                    { name: "Tailwind CSS", level: "Avançado" },
                    { name: "Vue.js", level: "Intermédio" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center"
                    >
                      <span>{skill.name}</span>
                      <Badge
                        variant={
                          skill.level === "Avançado" ? "default" : "secondary"
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backend & Databases</CardTitle>
                <CardDescription>Tecnologias server-side</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Node.js", level: "Avançado" },
                    { name: "PostgreSQL", level: "Avançado" },
                    { name: "Supabase", level: "Avançado" },
                    { name: "Prisma", level: "Intermédio" },
                    { name: "Docker", level: "Intermédio" },
                  ].map((skill) => (
                    <div
                      key={skill.name}
                      className="flex justify-between items-center"
                    >
                      <span>{skill.name}</span>
                      <Badge
                        variant={
                          skill.level === "Avançado" ? "default" : "secondary"
                        }
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interesses Pessoais */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Além do Código
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Coffee className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Café Especial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Apaixonado por café de origem, adoro explorar diferentes
                  métodos de extração e torrefações.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Fotografia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Capturo momentos e paisagens no tempo livre, especialmente
                  durante viagens e caminhadas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Music className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle>Música</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Toco guitarra há alguns anos e gosto de explorar diferentes
                  géneros musicais.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Vamos Conversar?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Gostaria de saber mais sobre o meu trabalho ou discutir um projeto?
            Estou sempre disponível para uma boa conversa!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Entrar em Contacto <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/blog">Ler o Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
