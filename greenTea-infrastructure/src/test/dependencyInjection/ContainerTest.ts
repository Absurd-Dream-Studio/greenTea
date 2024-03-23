import {Container, injectable, interfaces} from "inversify";

export class ContainerTest{

  constructor()
  {

  }

  //normal operation
  Test1()
  {
    let c1 = new Container()
    // inject service
    c1.bind<Test>(Test).toSelf().inSingletonScope()
    // get the service
    let c1Test = c1.get(Test)
    c1Test.set(2)
    console.log(c1Test.get())

    let c2 = c1.createChild()
    c2.bind<Test2>(Test2).toSelf()
    let c2Test = c2.get(Test)
    let c2Test2 = c2.get(Test2)

    c2Test.set(3)
    console.log(c2Test.get())
    console.log(c2Test2.get())

    // get instance with di
    c2.resolve(ResolveClass)

  }
}


@injectable()
class Test{
  private t1:number

  constructor()
  {
    this.t1 = 1
  }

  set(v:number)
  {
    this.t1 = v
  }

  get():number
  {
    return this.t1
  }
}

@injectable()
class Test2{
  private test:Test

  constructor(test:Test)
  {
    this.test = test
  }

  get():number
  {
    return this.test.get()
  }
}

@injectable()
class ResolveClass
{
  constructor(t1:Test , t2:Test2)
  {
    console.log(`resolve class t1 : ${t1.get()} t2 : ${t2.get()}`)
  }
}

class Test3{

}

interface Test4{

}

@injectable()
class Test5 implements Test4{
}

@injectable()
class Test6{
  constructor(t:Test4)
  {

  }
}