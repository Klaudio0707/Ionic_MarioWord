import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  public count = 0;
  public scoreElement!: HTMLElement;

  constructor(private activatedRoute: ActivatedRoute, public elementRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.scoreElement = this.elementRef.nativeElement.querySelector('.score-texto') ?? this.elementRef.nativeElement;

    const mario = document.querySelector('.mario') as HTMLImageElement;
    const pipe = document.querySelector('.pipe') as HTMLElement;

    const pular = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        this.pular();
      }
    };

    document.addEventListener('keydown', pular);
    
    const checkCollision = () => {
      const pipePosition = pipe.offsetLeft;
      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

      if (pipePosition <= 50 && marioPosition > 0 && marioPosition < 80) {
        // Game over
        mario.src = "/assets/img/game-over.png";
        mario.style.width = '70px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);
      }
    };

    const loop = setInterval(checkCollision, 10);
  }

  pular(): void {
    this.count++;
    this.scoreElement.innerText = `${this.count}`;
    const mario = document.querySelector('.mario') as HTMLImageElement;
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}
