import { Opinion } from 'src/app/models/Opinion';

export interface OpinionDTO {
  // id: number;
  is_positive: boolean;
  description: string;
}

export class OpinionMapper {

  public static getCamelCase(opinionRaw: OpinionDTO): Opinion {
    const opinion: Opinion = {
      // id: opinionRaw.id,
      isPositive: opinionRaw.is_positive,
      description: opinionRaw.description
    };
    return opinion;
  }
  public static getSnakeCase(opinion: Opinion): OpinionDTO {
    const opinionRaw: OpinionDTO = {
      // id: opinion.id,
      is_positive: opinion.isPositive,
      description: opinion.description
    };
    return opinionRaw;
  }
}
