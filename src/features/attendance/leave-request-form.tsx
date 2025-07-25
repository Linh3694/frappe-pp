import clsx from 'clsx'
import React, { HTMLAttributes, useCallback, useState } from 'react'
import { Button } from '@atoms/button'
import { Calendar } from '@atoms/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@atoms/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@atoms/select'
import { Textarea } from '@atoms/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../core/ui/atoms/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import useLeaveRequest from './hooks/use-leave-request'

type Props = HTMLAttributes<HTMLDivElement> & {
  onSubmit?: VoidFunction
}

export default function LeaveRequestForm({ className, onSubmit }: Props) {
  const handleSuccess = () => {}

  const { form, error, handleSubmit } = useLeaveRequest(handleSuccess)

  return (
    <div className={clsx('flex max-w-[700px] flex-col gap-4', className)}>
      <div className="flex flex-col gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-5"
          >
            <div className="space-y-3">
              <FormLabel>
                <span className="text-sm font-semibold text-brand-teal">
                  From
                </span>
                <span className="ml-0.5 text-red-500">*</span>
              </FormLabel>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="sessionFromDate"
                  render={({ field }) => (
                    <FormItem className="w-[30%]">
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fromDate"
                  render={({ field }) => (
                    <FormItem className="w-[70%]">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger className="w-full">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                            >
                              {form.watch('fromDate')
                                ? format(
                                    form.watch('fromDate'),
                                    'eee, dd/MM/yyyy',
                                  )
                                : 'Select a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-fit">
                            <Calendar
                              mode="single"
                              onSelect={(value) =>
                                value && form.setValue('fromDate', value)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <FormLabel>
                <span className="text-sm font-semibold text-brand-teal">
                  To
                </span>
                <span className="ml-0.5 text-red-500">*</span>
              </FormLabel>
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="sessionToDate"
                  render={({ field }) => (
                    <FormItem className="w-[30%]">
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a session" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="morning">Morning</SelectItem>
                              <SelectItem value="afternoon">
                                Afternoon
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toDate"
                  render={({ field }) => (
                    <FormItem className="w-[70%]">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger className="w-full">
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                            >
                              {form.watch('toDate')
                                ? format(
                                    form.watch('toDate'),
                                    'eee, dd/MM/yyyy',
                                  )
                                : 'Select a date'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-fit">
                            <Calendar
                              mode="single"
                              onSelect={(value) =>
                                value && form.setValue('toDate', value)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <FormLabel>
                <span className="text-sm font-semibold text-brand-teal">
                  Reason
                </span>
                <span className="ml-0.5 text-red-500">*</span>
              </FormLabel>
              <FormField
                control={form.control}
                name="sessionToDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Absence reason"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="lg"
                className="w-fit font-semibold [background:var(--gradient-t-s)] hover:opacity-80"
              >
                Send request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
