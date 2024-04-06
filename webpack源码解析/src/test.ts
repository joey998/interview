import out from "./index";

let c1 = 12;
console.log(123);
interface Mv {
  prop1: string;
}

let c2: Mv = {
  prop1: "fsaf",
};

class sa {
  public a: number;
  constructor() {
    this.a = out.va;
  }
}

let m = new sa();
console.log(m.a);

function cv(v) {
  console.log(v.getValue());
}

cv(12);

const obj = { counter: 0 };
if (Math.random() > 0.5) {
  obj.counter = "21";
}
