import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  headerCards!: { icon: String, img: String, label: String, workers: number }[]
  services!: { img: String, title: String, subCategories: String[] }[]
  selectedService: number = 0;
  selectedSubService: number = 0;
  animate: boolean = false;

  testimonials!: { author: String, message: String }[]

  ngOnInit(): void{
    this.initHeaderCards()
    this.initServices()
    this.initTestimonials()
  }

  onSelectService(index: number): void{
    this.animate = true
    setTimeout(() => {
      this.animate=false
      this.selectedService = index
      this.selectedSubService = 0
    }, 1500)
  }

  onSelectSubService(index: number): void{
    this.animate = true
    setTimeout(() => {
      this.animate=false
      this.selectedSubService = index
    }, 1500)
  }

  private initHeaderCards(): void{
    this.headerCards = [
      { icon: '/assets/icons/broom.png', img: '/assets/images/broom.png', label: 'Nettoyage', workers: 500 },
      { icon: '/assets/icons/glue.png', img: '/assets/images/installation.png', label: 'Installation', workers: 250 },
      { icon: '/assets/icons/plumbing.png', img: '/assets/images/plumbing.png', label: 'Plomberie', workers: 300 },
      { icon: '/assets/icons/fire.png', img: '/assets/images/fire.png', label: 'Tendance', workers: 500 },
    ]
  }

  private initServices(): void{
    this.services = [
      { img: '/assets/icons/broom_b_w.png', title: 'Nettoyage', subCategories: ['Nettoyage', 'Nettoyage pour fête', "Nettoyage d'appartement", "Nettoyage de garage", "Nettoyage de démenagement"] },
      { img: '/assets/icons/tools_b_w.png', title: 'Montage', subCategories: ['Montage 1', 'Montage 2', "Montage 3", "Montage 4", "Montage 5"] },
      { img: '/assets/icons/move_b_w.png', title: "Déplacement", subCategories: ['Déplacement 1', 'Déplacement 2', "Déplacement 3", "Déplacement 4", "Déplacement 5"] },
      { img: '/assets/icons/glue_b_w.png', title: 'Installation', subCategories: ['Installation 1', 'Installation 2', "Installation 3", "Installation 4", "Installation 5"] },
      { img: '/assets/icons/paint_b_w.png', title: 'Peinture', subCategories: ['Peinture 1', 'Peinture 2', "Peinture 3", "Peinture 4", "Peinture 5"] },
      { img: '/assets/icons/plumbing_b_w.png', title: 'Plomberie', subCategories: ['Plomberie 1', 'Plomberie 2', "Plomberie 3", "Plomberie 4", "Plomberie 5"] },
      { img: '/assets/icons/fire_b_w.png', title: 'Tendance', subCategories: ['Tendance 1', 'Tendance 2', "Tendance 3", "Tendance 4", "Tendance 5"] },
    ]
  }

  private initTestimonials(): void{
    this.testimonials = [
      {author: 'Atangana', message: "M'a permis de trouver si facilement un bricoleur fiable pour les réparations de ma maison. Le service était de premier ordre et je ne pourrais pas être plus satisfait des résultats."},
      {author: 'Ngazang', message: "J'hésitais à utiliser un service comme celui-ci, mais il a dépassé mes attentes. Le technicien était professionnel, efficace et a fait un excellent travail."},
      {author: 'Feuwo', message: "J'ai utilisé Book Trusted Help à plusieurs reprises et j'ai toujours été impressionné par la qualité du service. Les professionnels sont compétents, fiables et font le travail correctement."},
      {author: 'Elanga', message: "J'ai été vraiment impressionné par le niveau de service que j'ai reçu. Le jardinier qu'ils ont envoyé était compétent et a fait un excellent travail en entretenant mon jardin. Je recommande vivement ce service."},
    ]
  }

}
