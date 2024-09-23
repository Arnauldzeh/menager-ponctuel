import { Component } from '@angular/core';

@Component({
  selector: 'app-become-worker',
  templateUrl: './become-worker.component.html',
  styleUrl: './become-worker.component.scss'
})
export class BecomeWorkerComponent {

  steps!: { img: String, title: String, content: String }[]

  ngOnInit(): void{
    this.initSteps()
  }

  private initSteps(): void{
    this.steps = [
      { img: '/assets/icons/laptop.png', title: 'Entrez votre numéro de téléphone', content: "Les sociétés partenaires de MP recrutent dans la plupart des grandes villes de Sangmelima." },
      { img: '/assets/icons/survey.png', title: 'Complétez le questionnaire', content: "Répondez à quelques questions pour que nous comprenions qui vous êtes et quelle est votre expérience." },
      { img: '/assets/icons/headset.png', title: 'Attendez notre appel', content: "Les sociétés partenaires de MP recrutent dans la plupart des grandes villes de Sangmelima." },
      { img: '/assets/icons/meeting.png', title: 'Passez un entretien physique', content: "Si l’entretien téléphonique est concluant, vous passerez un entretien physique avec le chargé de recrutement ." },
    ]
  }
}
