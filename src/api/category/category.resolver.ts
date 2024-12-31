import { Query, Resolver } from '@nestjs/graphql'
import { CategoryService } from './category.service'
import { Category } from './entity/category.entity'

@Resolver()
export class CategoryResolver {
	constructor(private readonly categoryService: CategoryService) {}

	@Query(() => [Category], { name: 'catalog' })
	async getCatalog() {
		return this.categoryService.getCatalog()
	}
}
