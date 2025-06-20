import { TestBed } from '@angular/core/testing';

import { ManejoListasService } from './manejo-listas.service';

describe('ManejoListasService', () => {
  let service: ManejoListasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoListasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
