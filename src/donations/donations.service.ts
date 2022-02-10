import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AggregateDonation } from 'src/@generated/prisma-nestjs-graphql/donation/aggregate-donation.output';
import { DonationAggregateArgs } from 'src/@generated/prisma-nestjs-graphql/donation/donation-aggregate.args';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { DonationSumAggregateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-sum-aggregate.input';
import { FindManyDonationArgs } from 'src/@generated/prisma-nestjs-graphql/donation/find-many-donation.args';

import { Donation } from '../@generated/prisma-nestjs-graphql/donation/donation.model';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(donationCreateInput: DonationCreateInput): Promise<Donation> {
    return this.prisma.donation.create({ data: donationCreateInput });
  }

  async findAll(
    findManyDonationArgs: FindManyDonationArgs,
  ): Promise<Donation[]> {
    return this.prisma.donation.findMany(findManyDonationArgs);
  }

  async getTotal(
    donationSumAggregateInput: DonationSumAggregateInput,
  ): Promise<number> {
    const result = await this.prisma.donation.aggregate({
      _sum: donationSumAggregateInput,
    });
    return result._sum.count;
  }

  // async findAll(): Promise<Donation[]> {
  //   return this.prisma.donation.findMany();
  // }

  // async findOne(id: number): Promise<Donation> {
  //   return `This action returns a #${id} donation`;
  // }
}
