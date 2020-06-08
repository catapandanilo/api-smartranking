import { Injectable, Logger } from '@nestjs/common'
import { CreatePlayerDto } from './dtos/create-player.dto'
import { Player } from './interfaces/player.interface'
import * as faker from 'faker'

@Injectable()
export class PlayersService {

  private players: Player[] = []

  private readonly logger = new Logger(PlayersService.name)

  async save(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto

    const playerFound = await this.players.find(player => player.email === email)

    if (playerFound) {
      await this.update(playerFound, createPlayerDto)
    }else {
      await this.create(createPlayerDto)
    }
  }

  async get(): Promise<Player[]> {
    return await this.players
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, cellphone, email } = createPlayerDto
    const player: Player = {
      _id: faker.random.uuid(),
      name,
      email,
      cellphone,
      ranking: faker.random.alphaNumeric(),
      positionRanking: faker.random.number(),
      urlPhotoPlayer: faker.image.imageUrl()
    }
    this.players.push(player)
  }

  private update(playerFound: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto
    playerFound.name = name
  }
}
