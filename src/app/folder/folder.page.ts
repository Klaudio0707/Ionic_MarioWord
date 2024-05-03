import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private count = 0;
  private scoreElement!: HTMLElement;

  constructor(private activatedRoute: ActivatedRoute, private elementRef: ElementRef<HTMLElement>) {}
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.scoreElement = this.elementRef.nativeElement.querySelector('.score-texto') ?? this.elementRef.nativeElement;

    const mario = document.querySelector('.mario') as HTMLImageElement;
    const pipe = document.querySelector('.pipe') as HTMLElement;
    
    const jump = () => {

    
      mario.classList.add('jump');
      setTimeout(() => {
        mario.classList.remove('jump');
      }, 500);
    };
    // const jump = () => {
    //   mario.classList.add('jump');
    //   setTimeout(() => {
    //     mario.classList.remove('jump');
    //   }, 500);
    // };
    document.addEventListener('keydown', jump );
    
    
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

    const loop = setInterval(checkCollision, 1);
  }

  down(): void {
    this.count++;
    this.scoreElement.innerText = `${this.count}`;
  }
}