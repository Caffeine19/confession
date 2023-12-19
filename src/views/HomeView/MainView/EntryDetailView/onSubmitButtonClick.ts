import dayjs from 'dayjs'
import {
  isExpressionValid,
  selectedCategory,
  createTime,
  selectedProperty,
  entryType,
  entryStore,
  calculatedAmount,
  remark,
  propertyStore
} from './EntryDetail.vue'

export const onSubmitButtonClick = async () => {
  try {
    //验证金额的输入是否正确
    if (isExpressionValid.value === false) throw new Error('amount invalid')
    //验证是否选择了分类
    if (!selectedCategory.value) throw new Error('category unSelected')
    //验证是否输入了日期
    if (!createTime.value) throw new Error('createTime unSelected')
    //验证是否选择了资产
    if (!selectedProperty.value) throw new Error('property unSelected')

    if (entryType.value === 'transfer') return

    await entryStore.createEntry({
      category: selectedCategory.value.id,
      amount: Number(calculatedAmount.value) * 100,
      created_at: dayjs(createTime.value).format('YYYY-MM-DD'),
      type: entryType.value,
      property: selectedProperty.value.id,
      remark: remark.value
    })

    await propertyStore.updatePropertyAmount({
      id: selectedProperty.value.id,
      amount: Number(calculatedAmount.value) * 100,
      type: entryType.value
    })

    showMessenger({ status: true, text: 'Create entry successfully' })
  } catch (error) {
    showMessenger({ status: false, text: 'Create entry failed~' + (error as Error).message })
  }

  entryStore.getEntryList()
  propertyStore.getPropertyList()
}
