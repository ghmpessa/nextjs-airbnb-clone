'use client'

import { useMemo, useState } from 'react'
import Modal from '../modal-template'

import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../category-input'
import { FieldValues, useForm } from 'react-hook-form'
import CountrySelect from '../country-select'
import dynamic from 'next/dynamic'

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()

  const [step, setStep] = useState<Steps>(Steps.CATEGORY)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      descrpition: '',
    },
  })

  const category = watch('category')
  const location = watch('location')

  const Map = useMemo(
    () => dynamic(() => import('../map'), { ssr: false }),
    [location]
  )

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const onBack = () => {
    setStep(p => p - 1)
  }

  const onNext = () => {
    setStep(p => p + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === Steps.PRICE) return 'Create'

    return 'Next'
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.CATEGORY) return
    return 'Back'
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={category => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === Steps.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={location => setCustomValue('location', location)}
        />
        <Map center={location?.latlng} />
      </div>
    )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
      body={bodyContent}
    />
  )
}

export default RentModal
