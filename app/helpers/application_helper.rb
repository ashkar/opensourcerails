# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  include TagsHelper
  
  # display flash_boxes (unless its already been shown)
  def flash_boxes
    unless @flash_shown
      @flash_shown = true
      partial "layouts/flash_boxes"
    else
      ""
    end
  end
  
  # returns the controller & action
  def action_path
    "#{params[:controller]}/#{params[:action]}"
  end
  
  # return the css class for the current controller and action
  def body_class
    classes = ""
    classes << "container"
    classes << " "
    classes << controller.controller_name
    classes << "-"
    classes << controller.action_name
    classes << " "
    unless production? 
      classes << "debug" 
    end
    
    return classes.strip
  end
  
  def production?
    ENV["RAILS_ENV"] == "production"
  end
  
  # returns either the new_arg or the edit_arg depending on if the action is a new or edit action
  def new_or_edit(new_arg, edit_arg, other = nil)
    if is_new?
      return new_arg
    elsif is_edit?
      return edit_arg
    else
      return other
    end
  end
  
  def is_new?
    action = params[:action]
    action == "new" || action == "create"
  end
      
  def is_edit?
    action = params[:action]
    action == "edit" || action == "update"
  end
  
  def current_year
    Time.now.strftime('%Y')
  end
  
  def paging(page_data, style = :sabros)
    return unless page_data.class == WillPaginate::Collection    
    will_paginate(page_data, :class => "pagination #{style}", :inner_window => 3)
  end
  
  def error_messages_for(name, options = {})
    super(name, {:id => "error_explanation", :class => "error"}.merge(options))
  end
  
  def hide_if(condition)
    if condition
      {:style => "display:none"}
    else
      {}
    end
  end
  
  def hide_unless(condition)
    hide_if(!condition)
  end
end
