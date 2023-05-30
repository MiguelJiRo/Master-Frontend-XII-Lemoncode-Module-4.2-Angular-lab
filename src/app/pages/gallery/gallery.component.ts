import { Component, Directive, ElementRef, ChangeDetectorRef } from '@angular/core';
import { map, Subscription, timer } from 'rxjs';

export interface ImageGallery {
  id: number;
  title: string;
  src: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  images: ImageGallery[] =
    [
      {
        id: 0,
        title: 'sheep 1',
        src: 'assets/sheep-(1).jpg',
      }, {
        id: 1,
        title: 'sheep 2',
        src: 'assets/sheep-(2).jpg',
      }, {
        id: 2,
        title: 'sheep 3',
        src: 'assets/sheep-(3).jpg',
      }, {
        id: 3,
        title: 'sheep 4',
        src: 'assets/sheep-(4).jpg',
      }, {
        id: 4,
        title: 'sheep 5',
        src: 'assets/sheep-(5).jpg',
      }, {
        id: 5,
        title: 'sheep 6',
        src: 'assets/sheep-(6).jpg',
      }, {
        id: 6,
        title: 'sheep 7',
        src: 'assets/sheep-(7).jpg',
      }, {
        id: 7,
        title: 'sheep 8',
        src: 'assets/sheep-(8).jpg',
      }, {
        id: 8,
        title: 'sheep 9',
        src: 'assets/sheep-(9).jpg',
      },
    ];

  currentImage: ImageGallery;
  lastImage: ImageGallery;
  startValue: number;
  endValue: number;
  selectedValue: ImageGallery;
  currentScale: number;
  disableBefore: boolean;
  disableBeforePage: boolean;
  disableNext: boolean;
  disableNextPage: boolean;
  biggerButton: boolean;
  smallerButton: boolean;
  resetButton: boolean;
  playButton: boolean;
  stopButton: boolean;
  timerSubscription: Subscription;

  constructor(private elementRef: ElementRef, private cdref: ChangeDetectorRef) {
    this.currentImage = this.images[0];
    this.lastImage = this.images[0];
    this.startValue = 0;
    this.endValue = 3;
    this.selectedValue = this.images[0];
    this.currentScale = 3;
    this.disableBefore = true;
    this.disableBeforePage = true;
    this.disableNext = false;
    this.disableNextPage = false;
    this.biggerButton = false;
    this.smallerButton = false;
    this.resetButton = true;
    this.playButton = false;
    this.stopButton = true;
    this.timerSubscription = new Subscription();
  }

  public slicedData(data: any[]): any[] {
    return data.slice(this.startValue, this.endValue);
  }

  // SET MAIN IMAGE

  public clickImage(image: ImageGallery) {
    this.currentImage = image;
    this.currentScale = 1;
  }

  private setMainImage(image: ImageGallery) {
    console.log(image);
    this.currentImage = image;
  }

  // SCALE

  public makeBigger() {
    this.currentScale += 1;
    console.log('current scale', this.currentScale);
    if (this.currentScale === 5) {
      this.biggerButton = true;
      this.smallerButton = false;
    }
    if (this.currentScale >= 4) {
      this.resetButton = false;
    }
  }

  public makeSmaller() {
    this.currentScale -= 1;
    console.log('current scale', this.currentScale);
    if (this.currentScale === 1) {
      this.biggerButton = false;
      this.smallerButton = true;
    }
    if (this.currentScale <= 2) {
      this.resetButton = false;
    }
  }

  public resetSizeImage() {
    this.currentScale = 3;
    console.log('current scale', this.currentScale);
    this.biggerButton = false;
    this.smallerButton = false;
    this.resetButton = true;
  }

  // INCREASE & DECREASE

  public increaseValue() {
    const index = this.getIndex(this.currentImage, +1);
    this.setMainImage(this.images[index]);
    this.updatePage(true);
    this.updateVisibilityNextBeforeButtons();
  }

  public decreaseValue() {
    const index = this.getIndex(this.currentImage, -1);
    this.setMainImage(this.images[index]);
    this.updatePage(false);
    this.updateVisibilityNextBeforeButtons();
  }

  // INCREASE & DECREASE PAGE

  public changePage(goRight: boolean) {
    if (goRight) {
      this.increasePage();
    }
    else {
      this.decreasePage();
    }
  }

  private updatePage(increaseValue: boolean) {
    const index = this.getIndex(this.currentImage, 0);
    console.log('index', index);
    console.log('this.images.length', this.images.length);
    if (increaseValue) {
      if (index === 3 || index === 6) {
        this.increasePage();
      }
    }
    else {
      if (index === 2 || index === 5) {
        this.decreasePage();
      }
    }
    this.updateVisibilityNextBeforePage();
  }

  private increasePage() {
    if (this.endValue < this.images.length) {
      this.startValue += 3;
      this.endValue += 3;
      this.currentImage = this.images[this.startValue];
      this.updateVisibilityNextBeforePage();
    }
  }

  private decreasePage() {
    if (this.startValue > 0) {
      this.startValue -= 3;
      this.endValue -= 3;
      this.currentImage = this.images[this.endValue - 1];
      this.updateVisibilityNextBeforePage();
    }
  }

  // PLAY & STOP

  public playGallery() {
    this.playButton = true;
    this.stopButton = false;
    this.timerSubscription = timer(0, 2000).pipe(
      map(() => {
        const index = this.getIndex(this.currentImage, 0);
        if (index === (this.images.length - 1)) {
          console.log('play max', index);
          this.startValue = 0;
          this.endValue = 3;
          this.setMainImage(this.images[this.startValue]);
        }
        else {
          this.increaseValue();
        }
        this.updateVisibilityNextBeforeButtons();
        this.updateVisibilityNextBeforePage();
      })
    ).subscribe();
  }

  public stopGallery() {
    this.playButton = false;
    this.stopButton = true;
    this.timerSubscription.unsubscribe();
  }

  // VISIBILITY

  private updateVisibilityNextBeforeButtons() {
    const index = this.getIndex(this.currentImage, 0);
    if (index === 0) {
      this.disableBefore = true;
    } else {
      this.disableBefore = false;
    }

    if (index === (this.images.length - 1)) {
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }

  private updateVisibilityNextBeforePage() {
    const index = this.getIndex(this.currentImage, 0);
    if (index < 3) {
      this.disableNextPage = false;
      this.disableBeforePage = true;
    }
    else if (index >= 6) {
      this.disableNextPage = true;
      this.disableBeforePage = false;
    }
    else {
      this.disableNextPage = false;
      this.disableBeforePage = false;
    }
  }

  // AUX

  private getIndex(image: ImageGallery, value: number): number {
    return this.images.findIndex((e: ImageGallery) => e.id === image.id + value)
  }
}