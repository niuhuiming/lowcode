import mitt from "mitt"

type Events = {
  currComp: Object
}

const emitter = mitt<Events>()
export default emitter