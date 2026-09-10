class MyClass{
    #x = 0;

    incX(){
        this.#x++;
        console.log(this.#x);
    }

    set #setX(x){
        this.#x = x;
    }

    get #getX(){
        return this.#x;
    }
}
const m = new MyClass();

m.incX();