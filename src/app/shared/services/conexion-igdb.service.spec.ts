import { TestBed } from '@angular/core/testing';

import { ConexionIgdbService } from './conexion-igdb.service';

describe('ConexionIgdbService', () => {
  let service: ConexionIgdbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionIgdbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
