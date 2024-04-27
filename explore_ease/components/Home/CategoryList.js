"use client";
import Data from '@/Shared/Data';
import React from 'react'
import { useState } from 'react'

function CategoryList() {
  const [categorisList, setCategoriesList] = useState([Data.CategoryListData])
  return (
    <div>
      <h2 className='font-bold'>Select Category</h2>
    </div>
  
  )
}

export default CategoryList
