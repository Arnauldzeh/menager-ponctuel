import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  headerCards!: { icon: String, img: String, label: String }[]
  services!: { img: String, title: String, subCategories: String[] }[]
  selectedService: number = 0;

  testimonials!: { author: String, message: String }[]

  ngOnInit(): void{
    this.initHeaderCards()
    this.initServices()
    this.initTestimonials()
  }

  private initHeaderCards(): void{
    this.headerCards = [
      { icon: '/assets/icons/broom.png', img: '/assets/images/broom.png', label: 'Nettoyage'},
      { icon: '/assets/icons/glue.png', img: '/assets/images/installation.png', label: 'Installation'},
      { icon: '/assets/icons/plumbing.png', img: '/assets/images/plumbing.png', label: 'Plomberie'},
      { icon: '/assets/icons/fire.png', img: '/assets/images/fire.png', label: 'Tendance'},
    ]
  }

  private initServices(): void{
    this.services = [
      { img: '/assets/icons/broom_b_w.png', title: 'Nettoyage', subCategories: ['Nettoyage', 'Nettoyage pour fête', "Nettoyage d'appartement", "Nettoyage de garage", "Nettoyage de démenagement"] },
      { img: '/assets/icons/tools_b_w.png', title: 'Montage', subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
      { img: '/assets/icons/move_b_w.png', title: "Déplacement", subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
      { img: '/assets/icons/glue_b_w.png', title: 'Installation', subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
      { img: '/assets/icons/paint_b_w.png', title: 'Peinture', subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
      { img: '/assets/icons/plumbing_b_w.png', title: 'Plomberie', subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
      { img: '/assets/icons/fire_b_w.png', title: 'Tendance', subCategories: ['Sub 1', 'Sub 2', "Sub 3", "Sub 4", "Sub 5"] },
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
