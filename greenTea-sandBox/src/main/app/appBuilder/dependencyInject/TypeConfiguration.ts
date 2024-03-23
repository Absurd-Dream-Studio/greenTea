import { default as InfrastructureTypeConfiguration} from "greentea-infrastructure/dependencyInject/TypeConfiguration"

// inject to interface type
let TypeConfiguration ={
  TYPES :{
  },
  Infrastructure: InfrastructureTypeConfiguration.TYPES
}

export default TypeConfiguration;