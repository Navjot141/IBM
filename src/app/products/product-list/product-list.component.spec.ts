import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { Product } from '../store/product';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  const expectedProds: Product[] = [
    { 
      id: 5310,
      uid: "f066a767-4bb4-4ad8-93af-a7069dec0bc7",
      blend_name: "Pumpkin-spice Blend",
      origin: "Dipilto, Nicaragua",
      variety: "Red Bourbon",
      notes: "sharp, tea-like, toast, nutmeg, hibiscus",
      intensifier: "structured"
    },
    { 
      id: 5311,
      uid: "f066a767-4bb4-4ad8-93af-a7069dec0bc8",
      blend_name: "red-spice Blend",
      origin: "Dipilto, Nicaragua",
      variety: "Red Bourbon Test",
      notes: "unbalanced, juicy, sugar cane, almond, fresh wood",
      intensifier: "unstructured"
    }
   ];

   beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [MatTableModule]
    }).compileComponents();
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test the table ', (done) => {
    expect(component.products).toEqual(expectedProds);
  
    fixture.detectChanges();
    fixture.whenStable().then(() => {
    fixture.detectChanges();
  
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(10);
  
      let headerRow = tableRows[0];
      expect(headerRow.cells[0].innerHTML).toBe('blend_name');
      expect(headerRow.cells[1].innerHTML).toBe('origin');
      expect(headerRow.cells[2].innerHTML).toBe('variety');
  
  
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe('Pumpkin-spice Blend');
      expect(row1.cells[1].innerHTML).toBe('Dipilto, Nicaragua');
      expect(row1.cells[2].innerHTML).toBe('Red Bourbon Test');
  
  
      done();
    });
  })
  
});
