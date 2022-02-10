import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AggregateDonation } from 'src/@generated/prisma-nestjs-graphql/donation/aggregate-donation.output';
import { DonationAggregateArgs } from 'src/@generated/prisma-nestjs-graphql/donation/donation-aggregate.args';
import { DonationSumAggregateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-sum-aggregate.input';
import { DonationSumAggregate } from 'src/@generated/prisma-nestjs-graphql/donation/donation-sum-aggregate.output';
import { Donation } from 'src/@generated/prisma-nestjs-graphql/donation/donation.model';
import { FindManyDonationArgs } from 'src/@generated/prisma-nestjs-graphql/donation/find-many-donation.args';

import { DonationCreateInput } from '../@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { TOTAL_UPDATED } from './constants/subscription-events';

import { DonationsService } from './donations.service';
import { TotalUpdate } from './dto/total-update.output';

const pubSub = new PubSub();

@Resolver(() => Donation)
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation(() => Donation)
  async createDonation(
    @Args('donationCreateInput') donationCreateInput: DonationCreateInput,
  ): Promise<Donation> {
    const created = await this.donationsService.create(donationCreateInput);
    const total = await this.donationsService.getTotal({ count: true });
    pubSub.publish(TOTAL_UPDATED, { [TOTAL_UPDATED]: { total } });
    return created;
  }

  @Subscription(() => TotalUpdate, { name: TOTAL_UPDATED })
  async totalUpdated() {
    return pubSub.asyncIterator(TOTAL_UPDATED);
  }

  @Query(() => [Donation], { name: 'donations' })
  async findAll(
    @Args() findManyDonationArgs: FindManyDonationArgs,
  ): Promise<Donation[]> {
    return this.donationsService.findAll(findManyDonationArgs);
  }

  @Query(() => Int, { name: 'total' })
  async getTotal(
    @Args('donationSumAggregateInput')
    donationSumAggregateInput: DonationSumAggregateInput,
  ): Promise<number> {
    return this.donationsService.getTotal(donationSumAggregateInput);
  }

  // @Query(() => Donation, { name: 'donation' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.donationsService.findOne(id);
  // }
}
