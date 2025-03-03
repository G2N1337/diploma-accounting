import { z, ZodIssueCode, ZodParsedType } from 'zod'

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        return { message: 'Обязательное поле' }
      }
      if (issue.expected === 'integer') {
        return {
          message: 'Число должно быть целым'
        }
      }

      return {
        message: `Ожидалось ${issue.expected}, получено ${issue.received}`,
      }
    case ZodIssueCode.invalid_literal:
      return {
        message: `Неверное значение, ожидалось ${JSON.stringify(
          issue.expected,
        )}`,
      }
    case ZodIssueCode.unrecognized_keys:
      return { message: `Неопознанные ключи: ${issue.keys.join(', ')}` }
    case ZodIssueCode.invalid_union:
      return { message: 'Неверное объединение' }
    case ZodIssueCode.invalid_union_discriminator:
      return { message: 'Неверный дискриминатор объединения' }
    case ZodIssueCode.invalid_enum_value:
      return {
        message: `Неверное значение перечисления, ожидалось одно из: ${issue.options.join(
          ', ',
        )}`,
      }
    case ZodIssueCode.invalid_arguments:
      return { message: 'Неверные аргументы функции' }
    case ZodIssueCode.invalid_return_type:
      return { message: 'Неверный тип возвращаемого значения функции' }
    case ZodIssueCode.invalid_date:
      return { message: 'Неверная дата' }
    case ZodIssueCode.invalid_string:
      if (issue.validation === 'uuid') {
        return { message: 'Обязательное поле' }
      }

      if (issue.validation === 'url') {
        return { message: 'Неверный формат ссылки' }
      }

      return { message: 'Неверная строка' }
    case ZodIssueCode.too_small:
      if (issue.minimum === 1) {
        return { message: 'Обязательное поле' }
      }

      return {
        message: `Значение слишком маленькое. Минимум: ${issue.minimum}`,
      }
    case ZodIssueCode.too_big:
      return { message: `Значение слишком большое. Максимум: ${issue.maximum}` }
    case ZodIssueCode.invalid_intersection_types:
      return { message: 'Неверные типы пересечения' }
    case ZodIssueCode.not_multiple_of:
      return { message: `Значение не кратно ${issue.multipleOf}` }
    case ZodIssueCode.not_finite:
      return { message: 'Значение не является конечным числом' }
    case ZodIssueCode.custom:
      return { message: `Внешняя ошибка: ${issue.message}` }
    default:
      return { message: ctx.defaultError }
  }
}

z.setErrorMap(errorMap)

export default errorMap
