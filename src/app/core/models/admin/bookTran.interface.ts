export interface IBookMovements {
   id?: string|number ;
   id_book: string|number;
   type :string;
   date: string;
   document:string;
   name_render?:string; //TODO: FIX THIS FUTURE PROBLEM NAME RENDER
}