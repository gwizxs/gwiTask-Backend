import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';
import { startOfDay, subDays } from 'date-fns';


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        tasks: true
      }
    })
  }
  getByEmail(email:string){
    return this.prisma.user.findUnique({
     where: {
    email
  },
})
}

async getProfile(id: string) {
  const profile = await this.getById(id)

  const totalTasks = profile.tasks.length
  const completedTasks = await this.prisma.task.count({
    where: {
      userId: id,
      isCompleted: true
    }
  })

  const todayStart = startOfDay(new Date())
  const weekStart = startOfDay(subDays(new Date(), 7));

  const todayTasks = await this.prisma.task.count({
    where: {
      userId: id,
      createdAt: {
        gte: todayStart.toISOString()
      }
    }
  })

  const weekTasks = await this.prisma.task.count({
    where: {
      userId: id,
      createdAt: {
        gte: weekStart.toISOString()
      }
    }
  })
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {password, ...rest } = profile

  return {
    user: rest,
    statistics: [
      {label: 'Total', value: totalTasks},
      {label: 'Completed', value: completedTasks},
      {label: 'Today', value: todayTasks},
      {label: 'Week', value: weekTasks},
    ]
  }
}

 async create(dto: UserDto) {
  const User = {
    email: dto.email,
    name: '',
    password: await hash(dto.password)
  }

  return this.prisma.user.create({
    data: User,
  })
}
async update(id: string, dto: UserDto) {
  let data = dto 

  if (dto.password) {
    data = {...dto, password: await hash(dto.password)}
  }

  return this.prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
     name: true,
     email: true,
    }
  })
}
}


