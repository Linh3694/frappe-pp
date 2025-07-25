import { useEffect, useState } from 'react'

type HookStackOptions<T> = {
  duplicateValidator?: (a: T, b: T) => boolean
  addValidator?: (a: T, b: T) => boolean
  removeValidator?: (a: T, b: T) => boolean
}

export const useStack = <T>({
  duplicateValidator,
  addValidator,
  removeValidator,
}: HookStackOptions<T>) => {
  const [pending, setPending] = useState<boolean>(false)
  const [stack, setStack] = useState<T[]>([])

  const addItems = (new_items: T[]) => {
    if (pending === false) {
      if (new_items.length > 0) {
        setPending(true)
        // console.log("STACK",stack);

        let temp = [...stack]
        new_items.map((new_item) => {
          if (addValidator) {
            let index_temp_item = temp.findIndex((old_item) =>
              addValidator(old_item, new_item),
            )
            // console.log("INDEX",index_temp_item);
            if (index_temp_item === -1) {
              temp.push(new_item)
            } else {
              //   let t1 = new Date(temp[index].modified).getTime()
              //   let t2 = new Date(item.modified).getTime()
              if (duplicateValidator?.(temp[index_temp_item], new_item)) {
                temp[index_temp_item] = new_item
              }
            }
          } else {
            temp.push(new_item)
          }
        })
        setStack(temp)
        setPending(false)
      }
    }
  }

  const removeItems = (remove_items: T[]) => {
    if (pending === false) {
      if (remove_items.length > 0) {
        setPending(true)
        let temp = [...stack]
        remove_items.map((remove_item) => {
          let index_temp_item = temp.findIndex((old_item) =>
            removeValidator?.(old_item, remove_item) || true,
          )
          temp.splice(index_temp_item, 1)
        })
        setStack(temp)
        setPending(false)
      }
    }
  }

  const resetStack = (items: T[]) => {
    setStack(items)
  }

  useEffect(() => {
    // console.log((stack));
  }, [JSON.stringify(stack)])

  return { stack, addItems, removeItems, resetStack, pending }
}
