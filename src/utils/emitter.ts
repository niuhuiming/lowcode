import mitt from "mitt"

type Events = {
  currComp: Object
}

const emitter = mitt<any>()
export default emitter