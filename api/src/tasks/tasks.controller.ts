import { Controller, Get, Post, Body, Query, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service'; // serviceロジックの読込
import { CreateTaskDto } from './dto/create-task.dto'; // I/Oの記述の読込
import { GetTasksDto } from './dto/get-tasks.dto';

@ApiTags('tasks') // Swagger上では"task"というタグにまとめる
@Controller('tasks') // /tasksに対応するcontrollerですよ
export class TasksController {
  constructor(private readonly service: TasksService) {}
  // TasksServiceの中で定義した関数をthis.serviceで使えるようにする

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  create(@Body() dto: CreateTaskDto) {
    // リクエストのbodyはCreateTaskDto型として受け取ります
    return this.service.create(dto);
    // 受け取ったデータをserviceで処理
  }

  @Get()
  @ApiOperation({ summary: 'List tasks' })
  @ApiOkResponse({ description: 'Get task list' })
  findAll(@Query() query: GetTasksDto) {
    const done = query.done === undefined ? undefined : query.done === 'true';
    // doneパラメータが文字列の場合、booleanのtrueに変換する
    return this.service.findAll({ done });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    // :idの部分をnumber型として取得する (例: /tasks/3 -> id=3)
    return this.service.findOne(id);
  }
}
